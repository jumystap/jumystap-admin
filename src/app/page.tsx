"use client"; // Add this line to declare the component as a Client Component

import { useEffect, useState } from "react";
import axios from "axios"

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

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("https://api.jumystap.kz/api/v1/analytics");
        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="py-5">Загрузка статистики...</div>;
  }

  return (
    <div className="py-5">
      <div className="bg-white border border-gray-100 rounded-lg px-5 py-4">
        <h1 className="text-2xl font-bold mb-5">Статистика платформы</h1>
        <ul className="list-disc space-y-3 ml-5">
          <li>
            <strong>Количество пользователей:</strong> {analytics.user_count}
          </li>
          <li>
            <strong>Количество выпускников:</strong> {analytics.graduate_count}
          </li>
          <li>
            <strong>Количество невыпускников:</strong> {analytics.none_graduate_count}
          </li>
          <li>
            <strong>Количество компаний:</strong> {analytics.companies_count}
          </li>
          <li>
            <strong>Количество объявлений:</strong> {analytics.announcements_count}
          </li>
          <li>
            <strong>Количество откликов:</strong> {analytics.responses_count}
          </li>
          <li>
            <strong>Количество откликнувшихся сотрудников:</strong> {analytics.employees_responded_count}
          </li>
          <li>
            <strong>Количество компаний, которые откликнулись:</strong> {analytics.companies_responded_count}
          </li>
        </ul>
      </div>
    </div>
  );
}

