"use client";

import { TicketList } from "@/app/dashboard/_components/ticket/ticket-list";
import SearchForm from "@/app/dashboard/_components/search/search-ticket-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { MetrolineStationSchedule } from "@/types/metroline";
import { getMetrolineStationsSchedule } from "@/action/schedule-trip";
import ScheduleTripList from "@/app/dashboard/_components/schedule/schedule-trip-list";
import { useUserStore } from "@/store/user-store";
import { BookNowCarousel } from "./_components/common/book-now-carousel";
import { UserFeedback } from "./_components/common/user-feedback";
import { NearestStations } from "./_components/common/nearest-station";
import { ActiveMetrolines } from "./_components/common/active-metro-list";
import {
  getSuspensionMetroline,
  getMetrolineById,
  SuspensionMetrolineWithDetails,
} from "@/action/metroline";

export default function Dashboard() {
  const { checkAuth } = useUserStore();
  const [metrolineTripSchedule, setMetrolineTripSchedule] = useState<
    MetrolineStationSchedule[]
  >([]);
  const [selectedTripIndex, setSelectedTripIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [suspensionMetrolineList, setSuspensionMetrolineList] = useState<
    SuspensionMetrolineWithDetails[]
  >([]);

  useEffect(() => {
    const initializeUser = async () => {
      await checkAuth();
    };
    initializeUser();

    const fetchSuspensionMetroline = async () => {
      try {
        const suspensionMetroline = await getSuspensionMetroline();
        // Fetch metroline details for each suspension
        const suspensionsWithDetails = await Promise.all(
          suspensionMetroline.map(async (suspension) => {
            const metrolineDetails = await getMetrolineById(
              suspension.metroLineID
            );
            return {
              ...suspension,
              metroLineName: metrolineDetails.metroLine.name,
            } as SuspensionMetrolineWithDetails;
          })
        );
        setSuspensionMetrolineList(suspensionsWithDetails);
      } catch (error) {
        console.error("Error fetching suspension details:", error);
        setSuspensionMetrolineList([]);
      }
    };
    fetchSuspensionMetroline();
  }, [checkAuth]);

  const handleSearch = async (
    startId: string,
    endId: string,
    dateTime: string
  ) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSelectedTripIndex(null);

    try {
      const onSearchingTripScheduleAction = getMetrolineStationsSchedule(
        startId,
        endId,
        dateTime
      );
      toast.promise(onSearchingTripScheduleAction, {
        loading: "Searching trip schedule...",
        success: async (trips) => {
          setMetrolineTripSchedule(trips);

          if (
            trips &&
            trips.length > 0 &&
            trips[0].schedules &&
            trips[0].schedules.length > 0
          ) {
            return "Available trips found for next 60 minutes";
          }

          return "No available trips found for next 60 minutes";
        },
        error: (error) => {
          console.error("Error fetching schedules:", error);
          return "Failed to find trip schedule";
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching schedules:", err);
      setMetrolineTripSchedule([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTrip = (index: number) => {
    setSelectedTripIndex(index);
    console.log(metrolineTripSchedule[index]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="w-full">
        <BookNowCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-6">
          <SearchForm onSearch={handleSearch} />
        </div>

        <section className="mt-10">
          <ScheduleTripList
            metrolineTripSchedule={metrolineTripSchedule}
            handleSelectTrip={handleSelectTrip}
            hasSearched={hasSearched}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {selectedTripIndex !== null && (
          <section className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-secondary mb-4">
              Your Tickets
            </h2>
            <TicketList
              selectedTrip={metrolineTripSchedule[selectedTripIndex]}
              suspensionMetrolineList={suspensionMetrolineList}
            />
          </section>
        )}

        <section className="mt-8">
          <NearestStations />
        </section>

        <section className="mt-8">
          <ActiveMetrolines />
        </section>

        <section className="mt-8">
          <UserFeedback className="mt-26 mb-10" />
        </section>
      </section>
    </div>
  );
}
