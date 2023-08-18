import type {
  MealPreTimeEntry,
  MealPreTimetables,
  MealTimeEntry,
  MealTimetables,
  Grade,
  Class,
} from "@app/utils/types";

import React from "react";

import {
  nowStackAtom,
  nowDateAtom,
  nowTimetablePeriodAtom,
  eventsAtom,
  mealsAtom,
  mealTimetablesAtom,
  timetablesAtom,
  myApplicationsAtom,
  laundrysAtom,
} from "@app/utils/atoms";
import {
  weekDefault,
  mealsDefault,
  timetablesDefault,
} from "@app/utils/defaults";
import { getDay, getTimeString } from "@app/utils/times";
import { AxiosError } from "axios";
import moment from "moment";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";

import { Toast } from "@app/components";
import { log } from "@app/utils/logging";

import { AxiosContext } from "./axios";

export interface Journal {
  type: string;
  title: string;
  date: string;
}

export interface StayApplication {
  [key: string]: {
    id: string;
    name: string;
  };
}
export interface StaySeat {
  [seat: string]: Array<string>;
}
export interface StayData {
  _id: string;
  current: boolean;
  dates: Array<Array<string>>;
  duration: Array<Array<Array<string>>>;
  end: string;
  seat: StaySeat;
  start: string;
}
export interface Stay {
  application: StayApplication;
  stay: StayData;
}

type EventGet = () => Promise<void>;
type MealGet = () => Promise<void>;
type MealTimetableGet = () => Promise<void>;
type TimetableGet = (_grade: Grade, _class: Class) => Promise<void>;
type MyApplicationGet = () => Promise<void>;
type LaundryGet = () => Promise<void>;
type LaundryCancel = () => Promise<void>;
type LaundryApply = (name: string, time: number) => Promise<void>;
type FrigoApply = (reason: string) => Promise<void>;
type JournalGet = () => Promise<Journal[]>;
type StayGet = () => Promise<Stay>;
const ApiContext = React.createContext<{
  clock: {
    date: string;
    day: string;
    week: typeof weekDefault;
  };
  event: {
    get: EventGet;
  };
  meal: {
    current: string;
    default: typeof mealsDefault;
    get: MealGet;
  };
  mealTimetable: {
    get: MealTimetableGet;
  };
  timetable: {
    period: number;
    default: typeof timetablesDefault;
    get: TimetableGet;
  };
  myApplication: {
    get: MyApplicationGet;
  };
  laundry: {
    get: LaundryGet;
    cancel: LaundryCancel;
    apply: LaundryApply;
  };
  frigo: {
    apply: FrigoApply;
  };
  journal: {
    get: JournalGet;
  };
  stay: {
    get: StayGet;
  };
}>(null);

const { Provider } = ApiContext;
interface ApiProviderProps {
  children: React.ReactNode;
}
const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { authAxios, publicAxios } = React.useContext(AxiosContext);

  const nowStack = useRecoilValue(nowStackAtom);
  const nowDate = useRecoilValue(nowDateAtom);
  const nowDay = weekDefault[getDay(nowDate)];
  const nowTimetablePeriod = useRecoilValue(nowTimetablePeriodAtom);

  const isClientError = (code: number) => {
    return code >= 400 && code < 500;
  };

  const showErrorToast = (message: string) => {
    Toast.show({
      type: "errorToast",
      props: {
        text: message,
      },
    });
  };

  const onError = (
    type: string,
    err: AxiosError<{ message: string }>,
    message: string,
  ) => {
    log("EROR", `API ${type}: ${err.message}`);
    showErrorToast(
      isClientError(err.response.status) ? err.response.data.message : message,
    );
  };

  const setEvents = useSetRecoilState(eventsAtom);
  const resetEvents = useResetRecoilState(eventsAtom);
  const getEvents: EventGet = async () => {
    try {
      const res = await authAxios.get("/event");
      setEvents({
        type: res.data.type,
        events: res.data.events,
        lastUpdated: nowDate,
      });
    } catch (err) {
      onError("[GET] Event", err, "이벤트 정보를 불러오는데 실패했습니다.");
      resetEvents();
    }
  };

  const setMeals = useSetRecoilState(mealsAtom);
  const resetMeals = useResetRecoilState(mealsAtom);
  const mealCurrent =
    nowStack[
      nowStack.findIndex((name) => {
        return name?.startsWith("meal:");
      }, "meal:")
    ]?.split(":")[1];
  const getMeals: MealGet = async () => {
    try {
      const res = await authAxios.get("https://디미고급식.com/api/week");

      const meals = { ...mealsDefault };
      for (const meal of res.data) {
        meals[Object.keys(mealsDefault)[getDay(meal.date)]] = {
          breakfast: meal.breakfast.split("/").join(", "),
          lunch: meal.lunch.split("/").join(", "),
          dinner: meal.dinner.split("/").join(", "),
        };
      }
      setMeals(meals);
    } catch (err) {
      onError("[GET] Meal Week", err, "급식 정보를 불러오는데 실패했습니다.");
      resetMeals();
    }
  };

  const setMealTimetables = useSetRecoilState(mealTimetablesAtom);
  const resetMealTimetables = useResetRecoilState(mealTimetablesAtom);
  const getMealTimetables: MealTimetableGet = async () => {
    try {
      const res = await authAxios.get("/meal/timetable");

      const generateMealTimetable = (data: string[]): MealPreTimeEntry[] =>
        data
          .map((time, index) => ({
            class: index + 1,
            time,
            startTimeUnix: moment(time, "HH:mm").unix(),
            startTimeString: getTimeString(time),
          }))
          .sort((a, b) => a.startTimeUnix - b.startTimeUnix);

      const preMealTimetables: MealPreTimetables = {
        lunch: generateMealTimetable(res.data.lunch),
        dinner: generateMealTimetable(res.data.dinner),
      };

      const generateMealWithEndTime = (
        meal: MealPreTimeEntry[],
      ): MealTimeEntry[] =>
        meal
          .map((time, index) => {
            const nextTime = meal.find(
              (findTime) => findTime.startTimeUnix > meal[index].startTimeUnix,
            );

            const additionalTime = nextTime?.startTimeUnix
              ? nextTime?.startTimeUnix - time.startTimeUnix
              : meal.find(
                  (findTime) => findTime.startTimeUnix > meal[0].startTimeUnix,
                )?.startTimeUnix - meal[0].startTimeUnix;

            const endTime = moment
              .unix(time.startTimeUnix + additionalTime)
              .format("HH:mm:ss");

            return {
              class: time.class,
              startTime: moment(time.time, "HH:mm").format("HH:mm:ss"),
              startTimeString: getTimeString(time.startTimeString),
              endTime,
            };
          })
          .map((time) => ({
            ...time,
            endTimeString: getTimeString(time.endTime),
          }));

      const mealTimetables: MealTimetables = {
        lunch: generateMealWithEndTime(preMealTimetables.lunch),
        dinner: generateMealWithEndTime(preMealTimetables.dinner),
      };

      setMealTimetables(mealTimetables);
    } catch (err) {
      onError(
        "[GET] Meal Timetable",
        err,
        "급식 시간표를 불러오는데 실패했습니다.",
      );
      resetMealTimetables();
    }
  };

  const setTimetables = useSetRecoilState(timetablesAtom);
  const resetTimetables = useResetRecoilState(timetablesAtom);
  const getTimetables: TimetableGet = async (_grade, _class) => {
    try {
      const res = await publicAxios.get(`/timetable/${_grade}/${_class}`);

      const timetables = { ...timetablesDefault };
      for (const item of res.data) {
        if (getDay(item.date) >= 1 && getDay(item.date) <= 5) {
          timetables[Object.keys(timetablesDefault)[getDay(item.date) - 1]] =
            item.sequence;
        }
      }
      setTimetables(timetables);
    } catch (err) {
      onError("[GET] Timetable", err, "시간표 정보를 불러오는데 실패했습니다.");
      resetTimetables();
    }
  };

  const setMyApplications = useSetRecoilState(myApplicationsAtom);
  const resetMyApplications = useResetRecoilState(myApplicationsAtom);
  const getMyApplications: MyApplicationGet = async () => {
    try {
      const res = await authAxios.get("/user/student/my");

      setMyApplications(res.data);
    } catch (err) {
      onError(
        "[GET] User Student My",
        err,
        "내 신청 정보를 불러오는데 실패했습니다.",
      );
      resetMyApplications();
    }
  };

  const setLaundrys = useSetRecoilState(laundrysAtom);
  const resetLaundrys = useResetRecoilState(laundrysAtom);
  const getLaundrys: LaundryGet = async () => {
    try {
      const res = await authAxios.get("/laundry/available");

      const laundrys = {};
      for (const item of res.data) {
        const floor = `${item.name[1]}층`;
        if (laundrys[floor] === undefined) {
          laundrys[floor] = [];
        }

        let nameString = "세탁기";
        if (item.name[2] === "L") {
          nameString = "좌측 세탁기";
        } else if (item.name[2] === "R") {
          nameString = "우측 세탁기";
        } else if (item.name[2] === "M") {
          nameString = "중앙 세탁기";
        }

        laundrys[floor].push({
          name: item.name,
          nameString,
          timetable: item.timetable,
        });
      }

      setLaundrys(laundrys);
    } catch (err) {
      onError(
        "[GET] Laundry Available",
        err,
        "세탁기 정보를 불러오는데 실패했습니다.",
      );
      resetLaundrys();
    }
  };
  const cancelLaundry: LaundryCancel = async () => {
    try {
      await authAxios.delete("/laundry");
      await getLaundrys();
    } catch (err) {
      onError("[DELETE] Laundry", err, "세탁기 예약 취소에 실패했습니다.");
      await getLaundrys();
    }
  };
  const applyLaundry: LaundryApply = async (name, time) => {
    try {
      await authAxios.post("/laundry/apply", {
        name,
        time,
      });
      await getLaundrys();
    } catch (err) {
      onError("[POST] Laundry Apply", err, "세탁기 예약에 실패했습니다.");
      await getLaundrys();
    }
  };

  const applyFrigo: FrigoApply = async (reason) => {
    if (!reason) return showErrorToast("금요귀가 사유를 입력해주세요.");
    try {
      await authAxios.post("/frigo", {
        reason,
      });
      await getMyApplications();
    } catch (err) {
      onError("[POST] Frigo", err, "금요귀가 신청에 실패했습니다.");
      await getMyApplications();
    }
  };

  const getJournals: JournalGet = async () => {
    try {
      const { data } = await authAxios.get("/journal/my");

      return data;
    } catch (err) {
      onError("[GET] Journal", err, "일지 정보를 불러오는데 실패했습니다.");
      return [];
    }
  };

  const getStays: StayGet = async () => {
    try {
      const { data } = await authAxios.get("/stay/current");

      const application = data.application
        .map((item) => ({
          [item.seat]: {
            name: item.name,
            id: `${item.grade}${item.class}${item.number
              .toString()
              .padStart(2, "0")}`,
          },
        }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {});

      return {
        stay: data.stay,
        application,
      };
    } catch (err) {
      onError("[GET] Stay", err, "잔류 정보를 불러오는데 실패했습니다.");
      return {
        stay: {},
        application: {},
      };
    }
  };

  return (
    <Provider
      value={{
        clock: {
          date: nowDate,
          day: nowDay,
          week: weekDefault,
        },
        event: {
          get: getEvents,
        },
        meal: {
          current: mealCurrent,
          default: mealsDefault,
          get: getMeals,
        },
        mealTimetable: {
          get: getMealTimetables,
        },
        timetable: {
          period: nowTimetablePeriod,
          default: timetablesDefault,
          get: getTimetables,
        },
        myApplication: {
          get: getMyApplications,
        },
        laundry: {
          get: getLaundrys,
          cancel: cancelLaundry,
          apply: applyLaundry,
        },
        frigo: {
          apply: applyFrigo,
        },
        journal: {
          get: getJournals,
        },
        stay: {
          get: getStays,
        },
      }}>
      {children}
    </Provider>
  );
};

export { ApiContext, ApiProvider };
