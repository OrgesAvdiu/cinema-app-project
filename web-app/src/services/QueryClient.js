import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { CategoryService } from "./CategoryService";
import { CustomerService } from "./CustomerService";
import { AdminService } from "./AdminService";
import { CityService } from "./CityService";
import { OffersService } from "./OffersService";
import { RoomService } from "./RoomService";
import { MovieService } from "./MovieService";
import { MovieDetailService } from "./MovieDetailService";
import { CinemaService } from "./CinemaService";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) =>
        error.response?.status !== 401 &&
        error.response?.status !== 403 &&
        count < 3,
    },
  },
});

export const setQueryDefaults = () => {
  const categoriesService = new CategoryService();
  const customersService = new CustomerService();
  const adminsService = new AdminService();
  const cityService = new CityService();
  const movieService = new MovieService();
  const cinemaService = new CinemaService();
  const roomService = new RoomService();
  const offerService = new OffersService();
  const movieDetailService = new MovieDetailService();

  queryClient.setQueryDefaults(QueryKeys.CATEGORIES, {
    queryFn: () => categoriesService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CUSTOMERS, {
    queryFn: () => customersService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ADMINS, {
    queryFn: () => adminsService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CITY, {
    queryFn: () => cityService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.MOVIE, {
    queryFn: () => movieService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CINEMA, {
    queryFn: () => cinemaService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ROOM, {
    queryFn: () => roomService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.MOVIEDETAIL, {
    queryFn: () => movieDetailService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.OFFER, {
    queryFn: () => offerService.findAll(),
  });
};
