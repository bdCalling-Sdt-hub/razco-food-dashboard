/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import {
  useCreateOfferMutation,
  useUpdateOfferMutation,
} from "@/redux/slices/admin/offerApi";
import { imageURL } from "@/redux/api/baseApi";
interface ErrorResponse {
  error?: {
    data?: {
      message?: string;
    };
  };
}

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  offer: any;
}

const OfferModel: React.FC<OfferModelProps> = ({ open, setOpen, offer }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [offerName, setOfferName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [createOffer, { data, isSuccess, error }] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();

  useEffect(() => {
    if (offer) {
      setOfferName(offer.offerName);
      setPercentage(offer.percentage);
      setImageUrl(offer.offerImage ? `${imageURL}/${offer.offerImage}` : "");
    } else {
      setOfferName("");
      setPercentage("");
      setImageUrl("");
      setImage(null);
    }
  }, [data, error, isSuccess, offer, setOpen]);
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
    if (!offerName || !percentage) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("offerName", offerName);
    formData.append("percentage", percentage);
    if (image) {
      formData.append("offerImage", image);
    }

    try {
      if (offer) {
        const res = await updateOffer({ id: offer._id, formData });

        if (res?.data?.success === true) {
          alert("Offer updated successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      } else {
        const res = await createOffer(formData);
        if (res?.data?.success === true) {
          alert("Offer created successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      }
      setOpen(false);
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        title={offer ? "Edit Offer" : "Add Offer"}
        onCancel={handleCancel}
        footer={false}
      >
        <Form.Item label="Offers Name">
          <Input
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
            placeholder="Offer name"
            size="large"
          />
        </Form.Item>
        <Form.Item label="Percentage">
          <Input
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Offer Percentage"
            size="large"
            type="number"
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
