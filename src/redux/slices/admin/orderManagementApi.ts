import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `order`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.order],
    }),

    updateOrderStatus: build.mutation({
      query: (data) => ({
        url: `order/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } =
  orderManagementApi;
