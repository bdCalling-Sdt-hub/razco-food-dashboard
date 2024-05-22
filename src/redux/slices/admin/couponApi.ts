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
      providesTags: [tagTypes.coupon],
    }),
    updateCoupon: build.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = couponApi;
