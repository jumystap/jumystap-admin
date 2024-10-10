"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export default function Home() {
  const [analytics, setAnalytics] = useState<{
    user_count: number;
    graduate_count: number;
    none_graduate_count: number;
    companies_count: number;
    announcements_count: number;
    responses_count: number;
    employees_responded_count: number;
    companies_responded_count: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2024-08-03"); // Default start date
  const [endDate, setEndDate] = useState(""); // End date defaults to today

  const fetchAnalytics = async (startDate?: string, endDate?: string) => {
    try {
      let url = "https://api.jumystap.kz/api/v1/analytics";
      if (startDate && endDate) {
        url += `?start_date=${startDate}&end_date=${endDate}`;
      }

      const response = await axios.get(url);
      setAnalytics(response.data.analytics);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    // Set the default end date to today's date if not already set
    if (!endDate) {
      setEndDate(format(new Date(), "yyyy-MM-dd"));
    }
    fetchAnalytics(startDate, endDate);
  }, [startDate, endDate]);

  const handleUpdate = () => {
    if (startDate && endDate) {
      setLoading(true);
      fetchAnalytics(startDate, endDate);
    }
  };

  const formatDateRange = () => {
    const start = format(new Date(startDate), "dd MMM yyyy", { locale: ru });
    const end = endDate ? format(new Date(endDate), "dd MMM yyyy", { locale: ru }) : format(new Date(), "dd MMM yyyy", { locale: ru });

    return `С ${start} - ${end}`;
  };

  if (!analytics) {
    return <div className="py-5">Загрузка статистики...</div>;
  }

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-8 py-5 pr-4">
        <div className="flex gap-x-2 items-center">
          <input
            type="text"
            className="px-5 py-2 rounded-lg border border-gray-100 bg-white w-[250px]"
            placeholder="Поиск аналитики"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-5 py-2 rounded-lg border border-gray-100 bg-white"
          />
          <div>-</div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-5 py-2 rounded-lg border border-gray-100 bg-white"
          />
          <div
            className="px-5 cursor-pointer py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleUpdate}
          >
            Обновить
          </div>
        </div>

        {!loading ? (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-white w-full rounded-lg border border-gray-100">
              <div className="text-gray-500 text-sm mt-3 px-5">
                Количество пользователей
              </div>
              <div className="flex mt-6 px-5">
                <div>
                  <div className="text-4xl">{analytics.user_count}</div>
                </div>
                <div className="ml-auto">
                  <div className="gap-x-3 items-center bg-green-100 ml-auto flex px-2 text-green-700 rounded-lg py-1">
                    <FaArrowTrendUp />
                    <div>2.15%</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 text-sm px-5 py-3 mt-5 text-gray-500">
                <div>{formatDateRange()}</div>
              </div>
            </div>

            <div className="bg-white w-full rounded-lg border border-gray-100">
              <div className="text-gray-500 text-sm mt-3 px-5">
                Количество вакансии
              </div>
              <div className="flex mt-6 px-5">
                <div>
                  <div className="text-4xl">{analytics.announcements_count}</div>
                </div>
                <div className="ml-auto">
                  <div className="gap-x-3 items-center bg-red-100 ml-auto flex px-2 text-red-700 rounded-lg py-1">
                    <FaArrowTrendDown />
                    <div>1.25%</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 text-sm px-5 py-3 mt-5 text-gray-500">
                <div>{formatDateRange()}</div>
              </div>
            </div>

            <div className="bg-white w-full rounded-lg border border-gray-100">
              <div className="text-gray-500 text-sm mt-3 px-5">
                Количество откликов
              </div>
              <div className="flex mt-6 px-5">
                <div>
                  <div className="text-4xl">{analytics.responses_count}</div>
                </div>
                <div className="ml-auto">
                  <div className="gap-x-3 items-center bg-green-100 ml-auto flex px-2 text-green-700 rounded-lg py-1">
                    <FaArrowTrendUp />
                    <div>5.15%</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 text-sm px-5 py-3 mt-5 text-gray-500">
                <div>{formatDateRange()}</div>
              </div>
            </div>

            <div className="col-span-2 py-2 rounded-lg border border-gray-100 bg-white">
              <div className="px-5">Топ объявлений</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-100 animate-pulse w-full rounded-lg h-36"></div>
            <div className="bg-gray-100 animate-pulse w-full rounded-lg h-36"></div>
            <div className="bg-gray-100 animate-pulse w-full rounded-lg h-36"></div>
          </div>
        )}
      </div>

      <div className="col-span-2 py-5">
        <div className="bg-white w-full px-5 py-4 border border-gray-100 rounded-lg">
          <div>Задачи на 08.10.2024</div>
        </div>
      </div>
    </div>
  );
}

