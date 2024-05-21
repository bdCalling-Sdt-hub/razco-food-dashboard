import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCoupon: build.mutation({
      query: (couponData) => ({
        url: `coupon/create-coupon`,
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getCoupons: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `coupon`,
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
      providesTags: [tagTypes.admin],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useDeleteCouponMutation,
} = couponApi;
