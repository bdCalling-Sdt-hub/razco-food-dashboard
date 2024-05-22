import { Form, Input, Modal } from "antd";
import Button from "../share/Button";
import { useEffect } from "react";
import { useReplyFeedbackMutation } from "@/redux/slices/admin/feedbackApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feedback: any;
}

const { TextArea } = Input;
const FeedbackModel: React.FC<OfferModelProps> = ({
  open,
  setOpen,
  feedback,
}) => {
  const [replyFeedback, { isLoading, isSuccess, error }] =
    useReplyFeedbackMutation();

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        alert(errorData.data.message);
        setOpen(false);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [error, isSuccess, setOpen]);

  const onFinish = async (values: any) => {
    try {
      const res = await replyFeedback({
        _id: feedback?._id,
        replyMessage: values?.replyMessage,
      });
      if (res?.data?.success === true) {
        alert("Replied Successful");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        title="Feedback Reply"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Feedback from: Sepuda">
            <TextArea rows={5} value={feedback?.description} readOnly />
          </Form.Item>
          <Form.Item name="replyMessage" label="Admin reply">
            <TextArea rows={5} />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">
            {isLoading ? "Sending.." : "Send"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackModel;
