import Title from '@/components/share/Title';
import { imageURL } from '@/redux/api/baseApi';
import { useCreateWeeklyDealMutation, useDeleteWeeklyDealMutation, useGetWeeklyDealQuery, useUpdateWeeklyDealMutation } from '@/redux/slices/admin/weeklyOfferApi';
import { Button, Modal, Table } from 'antd';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react'
import toast from 'react-hot-toast';

interface IWeeklyDealProps {
    _id: string;
    image: string;
}


const WeeklyOffer = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<IWeeklyDealProps | null>(null)
    const {data: offers, refetch } = useGetWeeklyDealQuery(undefined);
    const [deleteWeeklyDeal] = useDeleteWeeklyDealMutation();
    const [createDeal, {isLoading}] = useCreateWeeklyDealMutation();
    const [updateWeeklyDeal, {isLoading: updatingLoading}] = useUpdateWeeklyDealMutation();
    const [imgFile, setImgFile] = useState(null)


    const handleDelete = async (id:string)=>{
        try {
            await deleteWeeklyDeal(id).unwrap().then((res)=>{
                if(res.success === true){
                   toast.success(res.message);
                   refetch();
                }
            })
        } catch (error:any) {
            toast.success(error.data.message)
        }
        
    }
    
    const handleUpdate = async()=>{

        const formData = new FormData();
        if(imgFile){
            formData.append("image", imgFile)
        }

        if(value?._id){
            try {
                await updateWeeklyDeal({id: value._id, image: formData}).unwrap().then((res)=>{
                    if(res.success === true){
                       toast.success(res.message);
                       refetch();
                    }
                })
            } catch (error:any) {
                toast.error(error.data.message)
            }
            
        }else{
            try {
                await createDeal(formData).unwrap().then((res)=>{
                    if(res.success === true){
                       toast.success(res.message);
                       setOpen(false)
                       setImgFile(null)
                       refetch();
                    }
                })
            } catch (error:any) {
                toast.error(error.data.message)
            }
        }
    }

    const columns = [
        {
            title: "S.NO",
            dataIndex: "sNo",
            key: "sNo",
            render: (_text: string, _record: any, index: number) => index + 1,
        },
        {
            title: <p className='text-left pl-10'>Offer Image</p>,
            dataIndex: "image",
            key: "image",
            render: (_: any, data: any) => (
                <div className=' flex justify-start w-full relative'>
                    <img 
                        src={`${imageURL}${data?.image}`} 
                        alt=""
                        className=''
                        style={{
                            width: 150,
                            height: 50,
                            objectFit: "contain"
                        }}
                    />
                </div>
            )
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: "action",
            key: "action",
            render: (_: any, data: any) => (
                <div className="flex items-center gap-2 justify-end">
                    <button 
                        className="text-primary"
                        onClick={()=>setValue(data)}
                    >
                        <Edit />
                    </button>
                    <button
                        onClick={()=>handleDelete(data?._id)}
                        className="text-red-500"
                    >
                        <Trash2 />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-10 mt-4">
                <Title>Weekly Deal</Title>
                <Button
                    style={{
                        background: "#7cc84e",
                        color: "white"
                    }}
                    className='h-[40px] flex items-center border-none outline-none shadow-none' 
                    onClick={()=>setOpen(true)} 
                    icon={<Plus size={20} />}
                >
                    Create Deal
                </Button>
            </div>

            <Table
                dataSource={offers?.data}
                columns={columns}
                pagination={false}
            />

            <Modal
                title={<p> { value ? "Edit Weekly Offer" : "Create Weekly Offer" }</p>}
                open={open || !!value}
                onCancel={()=>{
                    setOpen(false);
                    setValue(null)
                    setImgFile(null)
                }}
                footer={false}
                centered
            >
                <div className="mt-10 w-full ">
                    <label htmlFor="" className='mb-2 block'>Weekly Offer Image</label>
                    <div>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="img"
                            onChange={(e:any)=>setImgFile(e.target.files?.[0])}
                        />
                        <label
                            htmlFor="img"
                            style={{
                                backgroundImage: value?.image ?  `url(${imageURL}${value?.image})` : imgFile ? `url(${URL.createObjectURL(imgFile)})` : 'none',
                                backgroundRepeat: "no-repeat",
                                objectFit: "contain",
                                width: "100%",
                                height: 150,
                                backgroundPosition: "center"
                            }}
                            className=" border cursor-pointer border-dashed rounded-lg flex items-center justify-center"
                        >
                            <p className={`${imgFile || value?.image ? "text-secondary" : null}`}>Upload</p>
                        </label>
                    </div>
                    <Button
                        onClick={handleUpdate}
                        type="primary"
                        style={{
                            background: "#7cc84e",
                            color: "white"
                        }}
                        className=" mt-6  h-10  mx-auto block"
                    >
                        {
                            updatingLoading || isLoading
                            ?
                            "Processing..."
                            :
                            "Save & Change"
                        }
                        
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default WeeklyOffer