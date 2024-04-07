import { Form, Input, Modal } from "antd";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const { TextArea } = Input;
const FeedbackModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus) => {
    console.log(valeus);
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
            <TextArea
              rows={5}
              value={
                "Scarce it grace and say mine was, later uncouth pomp had day in pangs, what ere save through few shun."
              }
              readOnly
            />
          </Form.Item>
          <Form.Item label="Admin reply">
            <TextArea rows={5} />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Send</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackModel;
