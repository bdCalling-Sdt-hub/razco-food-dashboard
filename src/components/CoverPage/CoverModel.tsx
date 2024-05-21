import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import { useCreateCoverMutation } from "@/redux/slices/admin/coverApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoverModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [coverName, setCoverName] = useState("");
  const [createCover, { isLoading, data, isSuccess, error }] =
    useCreateCoverMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Banner add Successfully");
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
  const handleCoupon = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    formData.append("bannerName", coverName);
    formData.append("bannerImage", image);

    try {
      await createCover(formData);
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
        {/* <Form onFinish={onFinish} layout="vertical"> */}
        <Form.Item name={"bannerName"} label="Cover Name">
          <Input
            onChange={(e) => setCoverName(e.target.value)}
            placeholder="Write cover name"
            size="large"
          />
        </Form.Item>
        {/* </Form> */}
        <div>
          <h2 className="text-md mb-2">Cover Image</h2>
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
        <Button onClick={handleCoupon} className="px-10 mx-auto mt-5">
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default CoverModel;
