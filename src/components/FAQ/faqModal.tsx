/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Button from "../share/Button";

import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "@/redux/slices/admin/settingApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  faqData: any;
}

const FaqModal: React.FC<OfferModelProps> = ({ open, setOpen, faqData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  useEffect(() => {
    if (faqData) {
      setQuestion(faqData?.question);
      setAnswer(faqData?.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [faqData]);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleFaq = async () => {
    const data = {
      question,
      answer,
    };
    try {
      if (faqData) {
        const res = await updateFaq({ id: faqData?._id, question, answer });
        if (res?.data?.success) {
          alert("FAQ Updated");
          setOpen(false);
        }
      } else {
        const res = await createFaq(data);
        if (res?.data?.success) {
          alert("FAQ Created");
          setOpen(false);
        }
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        title={faqData ? "Edit FAQ" : "Add FAQ"}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item label="Question">
            <Input
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              size="large"
              value={question}
            />
          </Form.Item>
          <Form.Item label="Answer">
            <Input
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              size="large"
              value={answer}
            />
          </Form.Item>
        </Form>

        <Button onClick={handleFaq} className="px-10 mx-auto mt-5">
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default FaqModal;
