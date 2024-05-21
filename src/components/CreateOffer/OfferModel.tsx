import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import { useCreateOfferMutation } from "@/redux/slices/admin/offerApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfferModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [offerName, setOfferName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [createOffer, { isLoading, data, isSuccess, error }] =
    useCreateOfferMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Offer add Successfully");
        setOpen(false);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, setOpen]);
  const formData = new FormData();
  if (image) {
    formData.append("bannerImage", image);
  }
  const handleCancel = () => {
    setOpen(false);
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
  };
  const handleOffer = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    formData.append("offerName", offerName);
    formData.append("percentage", percentage);
    formData.append("offerImage", image);

    try {
      await createOffer(formData);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        title="Add Offer"
        onCancel={handleCancel}
        footer={false}
      >
        <Form.Item label="Offers Name">
          <Input
            onChange={(e) => setOfferName(e.target.value)}
            placeholder="Offer name"
            size="large"
          />
        </Form.Item>
        <Form.Item name={"percentage"} label="Percentage">
          <Input
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Offer Percentage"
            size="large"
          />
        </Form.Item>

        <div>
          <h2 className="text-md mb-2">Upload Image</h2>
          <input
            type="file"
            className=" hidden"
            id="image"
            onChange={handleImage}
          />
          <label
            htmlFor="image"
            className="w-full border rounded flex justify-center items-center h-36 cursor-pointer"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover rounded"
                alt=""
              />
            ) : (
              <Image size={30} />
            )}
          </label>
        </div>
        <Button onClick={handleOffer} className="px-10 mx-auto mt-5">
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default OfferModel;
