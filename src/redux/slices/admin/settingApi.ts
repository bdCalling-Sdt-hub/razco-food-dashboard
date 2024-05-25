import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrivacyPolicy: build.mutation({
      query: (policyData) => ({
        url: `rules/privacy-policy`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.policy],
    }),
    createTermsConditions: build.mutation({
      query: (policyData) => ({
        url: `rules/terms-and-conditions`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    createAboutUs: build.mutation({
      query: (policyData) => ({
        url: `rules/about`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.about],
    }),
    createFaq: build.mutation({
      query: (policyData) => ({
        url: `faq/create-faq`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    getPrivacyPolicy: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/privacy-policy`,
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
      providesTags: [tagTypes.policy],
    }),
    getAboutUs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/about`,
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
      providesTags: [tagTypes.about],
    }),
    getTermsConditions: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/terms-and-conditions`,
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
      providesTags: [tagTypes.terms],
    }),
    myProfile: build.query({
      query: () => {
        return {
          url: `user/profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.profile],
    }),
    faqs: build.query({
      query: () => {
        return {
          url: `faq`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.faq],
    }),
    notifications: build.query({
      query: () => {
        return {
          url: `notifications`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.notification],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `user/profile-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updateTermsConditions: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/terms-and-conditions`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    updatePrivacyPolicy: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/privacy-policy`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: [tagTypes.policy],
    }),
    updateAboutUs: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/about`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: [tagTypes.about],
    }),
    changePassword: build.mutation({
      query: (userData) => ({
        url: `auth/change-password`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [tagTypes.password],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `auth/forget-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.forget],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.reset],
    }),
    verifyEmail: build.mutation({
      query: (data) => ({
        url: `auth/otp-verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.verify],
    }),
    updateFaq: build.mutation({
      query: ({ id, question, answer }) => ({
        url: `faq/${id}`,
        method: "PATCH",
        body: { question, answer },
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `faq/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    dashboardOverview: build.query({
      query: () => {
        return {
          url: `order/sales-overview`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useCreateTermsConditionsMutation,
  useGetTermsConditionsQuery,
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useNotificationsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsConditionsMutation,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useFaqsQuery,
  useDashboardOverviewQuery,
} = settingApi;
