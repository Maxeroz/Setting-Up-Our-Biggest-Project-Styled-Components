import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: getBookings,
    queryKey: ["bookings"],
  });

  return { isLoading, bookings, error };
}
