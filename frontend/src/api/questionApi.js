import axiosClient from "./axiosClient";
import { mapQuestionListItem, mapQuestionDetailItem } from "../models/question";

const questionApi = {
  getAllQuestions: async ({ subject_id, difficulty } = {}) => {
    try {
      const response = await axiosClient.get("/question", {
        params: {
          subject_id,
          difficulty,
        },
      });

      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      let rawData = [];

      if (Array.isArray(api.data)) {
        rawData = api.data;
      } else if (api.data?.items && Array.isArray(api.data.items)) {
        rawData = api.data.items;
      } else if (api.data?.questions && Array.isArray(api.data.questions)) {
        rawData = api.data.questions;
      } else if (api.data?.data && Array.isArray(api.data.data)) {
        rawData = api.data.data;
      } else if (api.data) {
        rawData = [api.data];
      }

      const mappedData = rawData.map(mapQuestionListItem);

      const metaSource = api.meta || api.data?.meta || {};
      const meta = {
        totalQuestion: metaSource.totalQuestion ?? metaSource.total ?? metaSource.total_questions ?? 0,
        amountSubject: metaSource.amountSubject ?? metaSource.amount_subject ?? metaSource.subjectCount ?? 0,
      };

      return {
        success,
        message,
        data: mappedData,
        meta,
      };
    } catch (error) {
      throw error;
    }
  },
  getQuestionById: async (questionId) => {
    try {
      const response = await axiosClient.get(`/question/${questionId}`);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      const raw = api.data || {};
      const mapped = mapQuestionDetailItem(raw);

      return {
        success,
        message,
        data: mapped,
      };
    } catch (error) {
      throw error;
    }
  },
  createQuestion: async (payload) => {
    try {
      const response = await axiosClient.post("/question", payload);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      const raw = api.data || {};
      // creation endpoint usually returns a list-level item (no content/answer)
      const mapped = mapQuestionListItem(raw);

      return {
        success,
        message,
        data: mapped,
      };
    } catch (error) {
      throw error;
    }
  },
  updateQuestion: async (questionId, payload) => {
    try {
      const response = await axiosClient.put(`/question/${questionId}`, payload);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      const raw = api.data || {};
      const mapped = mapQuestionDetailItem(raw);

      return {
        success,
        message,
        data: mapped,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default questionApi;
