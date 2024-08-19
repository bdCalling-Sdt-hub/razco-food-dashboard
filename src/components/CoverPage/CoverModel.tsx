/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import {
  useCreateCoverMutation,
  useUpdateCoverMutation,
} from "@/redux/slices/admin/coverApi";
import { imageURL } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cover: any;
}

const CoverModel: React.FC<OfferModelProps> = ({ open, setOpen, cover }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [coverName, setCoverName] = useState("");
  const [createCover, { data, isLoading, isSuccess, error }] = useCreateCoverMutation();
  // console.log(cover.bannerImage);
  const [updateCover] = useUpdateCoverMutation();
  useEffect(() => {
    if (cover) {
      setCoverName(cover.bannerName);
      setImageUrl(cover.bannerImage ? `${imageURL}/${cover.bannerImage}` : "");
    } else {
      setCoverName("");
      setImageUrl("");
      setImage(null);
    }
  }, [cover, data, error, isSuccess, setOpen]);
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
    // if (!image) {
    //   alert("Please select an image");
    //   return;
    // }

    // formData.append("bannerName", coverName);
    // formData.append("bannerImage", image);

    // try {
    //   await createCover(formData);
    // } catch (err: any) {
    //   console.error(err.message);
    // }
    if (!coverName) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("bannerName", coverName);

    if (image) {
      formData.append("bannerImage", image);
    }

    try {
      if (cover) {
        const res = await updateCover({ id: cover._id, formData });

        if (res?.data?.success === true) {
          toast.success("Cover updated successfully");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
        }
      } else {
        if (!image) {
          toast.error("Please select an image");
          return;
        }
        const res = await createCover(formData);
        if (res?.data?.success === true) {
          toast.success("Cover created successfully");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
        }
      }
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
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
        <label htmlFor="" className="block mb-2">Cover Name</label>
        <Form.Item>
          <Input
            onChange={(e) => setCoverName(e.target.value)}
            placeholder="Write cover name"
            size="large"
            name={"bannerName"}
            value={coverName}
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
          {isLoading ? "Creating" : "Save" }
        </Button>
      </Modal>
    </div>
  );
};

export default CoverModel;
