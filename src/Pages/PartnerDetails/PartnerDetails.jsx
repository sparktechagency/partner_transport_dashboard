import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useGetPartnerDetailsQuery } from '../../redux/api/partnerManagementApi'
import { imageUrl } from '../../redux/api/baseApi'
import { Image } from 'antd'
import Loading from '../../Components/Loading/Loading'

const PartnerDetails = () => {
    const { id } = useParams()
    //Get partner details api
    const { data: getPartnerDetails, isLoading } = useGetPartnerDetailsQuery(id)
    console.log(getPartnerDetails?.data?.country);

    const [basicInfo, setBasicInfo] = useState(true)
    return (
        <div className=' bg-white p-5 rounded-md'>
            <div className='flex  items-center gap-2 '>
                <Link to={-1}><FaArrowLeft size={20} className='text-blue-600' /></Link>
                <p className='font-semibold text-[20px]'>Partner Details</p>
            </div>
            {isLoading ? <Loading type="detail" /> : <div>
                <div className='flex flex-col justify-center items-center'>
                    {/* <div className='rounded-full overflow-hidden'> */}

                        <Image className='w-36 rounded-full' width={100} height={100} src={`${imageUrl}${getPartnerDetails?.data?.profile_image}`} alt="" />
                    {/* </div> */}

                    {/* <img src={`${imageUrl}${getPartnerDetails?.data?.profile_image}`} className='h-16 w-16 rounded-full object-cover' alt="" /> */}
                    <p className='text-xl font-medium mt-2'>{getPartnerDetails?.data?.name}</p>
                </div>

                <div className='flex items-center justify-center gap-5 mt-5'>

                    <p onClick={() => setBasicInfo(true)} className={` cursor-pointer font-medium ${basicInfo ? 'text-blue-600  border-b border-b-blue-600' : ''}`}>Basic Info</p>
                    <p onClick={() => setBasicInfo(false)} className={` cursor-pointer font-medium ${!basicInfo ? 'text-blue-600 border-b border-b-blue-600' : ''}`}>Bank Info</p>
                </div>
                {
                    basicInfo ? <div className='max-w-lg mx-auto mt-10 space-y-3'>
                        <p className='flex items-center justify-between'><span className='font-medium'>Email:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.email}</span></p>
                        <p className='flex items-center justify-between'><span className='font-medium'>Phone Number:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.phone_number ? getPartnerDetails?.data?.phone_number : "N/A"}</span></p>
                        <p className='flex items-center justify-between'><span className='font-medium'>Location:</span> <span className='text-gray-500'>{ }{getPartnerDetails?.data?.city},{getPartnerDetails?.data?.state},{getPartnerDetails?.data?.country}</span></p>

                        <div>
                            <p>Vehicle Photos: </p>
                            <div className='mt-5 flex gap-2  justify-between'>
                                <Image className='w-36' width={160} height={300} src={`${imageUrl}${getPartnerDetails?.data?.vehicleFrontImage}`} alt="" />
                                <Image className='w-36' width={160} height={300} src={`${imageUrl}${getPartnerDetails?.data?.vehicleSideImage}`} alt="" />
                                <Image className='w-36' width={160} height={300} src={`${imageUrl}${getPartnerDetails?.data?.vehicleBackImage}`} alt="" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='w-full my-2 '>
                                <p className='my-2 font-medium text-xl'>Vehicle license plate:</p>
                                <Image className='w-44 h-36' width={250} height={300} src={`${imageUrl}${getPartnerDetails?.data?.licensePlateImage}`} alt="" />
                                <p className='my-5 font-medium text-xl'>Vehicle insurance photo:</p>
                                <Image className='w-full h-36' width={250} height={300} src={`${imageUrl}${getPartnerDetails?.data?.vehicleInsuranceImage}`} alt="" />

                            </div>
                            <div className='w-full my-2'>
                                <p className='my-2 font-medium text-xl'>Driving License:</p>
                                <Image className='w-44 h-36' width={250} height={300} src={`${imageUrl}${getPartnerDetails?.data?.drivingLicenseImage}`} alt="" />
                                <p className='my-5 font-medium text-xl'>Vehicle registration card :</p>
                                <Image className='w-full h-36' width={250} height={300} src={`${imageUrl}${getPartnerDetails?.data?.vehicleRegistrationCardImage}`} alt="" />

                            </div>
                        </div>
                    </div> : <div className='max-w-lg mx-auto mt-10 space-y-3'>
                        <p className='flex items-center justify-between'><span className=''>Bank Name:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.bank_name}</span></p>
                        <p className='flex items-center justify-between'><span className=''>Account Holder Name:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.bank_holder_name}</span></p>
                        {/* <p className='flex items-center justify-between'><span className=''>Account Holder Type:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.bank_holder_type}</span></p> */}
                        <p className='flex items-center justify-between'><span className=''>Account Number:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.bank_account_number
                        }</span></p>
                        <p className='flex items-center justify-between'><span className=''>Routing Number:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.
                            routing_number}</span></p>
                        {/* <p className='flex items-center justify-between'><span className=''>Phone Number:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.phone_number}</span></p> */}

                        <p className='flex items-center justify-between'><span className=''>Date of Birth:</span> <span className='text-gray-500'>{getPartnerDetails?.data?.date_of_birth}</span></p>
                        {/* <p className='flex items-center justify-between'><span className=''>Business Name:</span> <span className='text-gray-500'>Governance Structure</span></p>
                        <p className='flex items-center justify-between'><span className=''>Website:</span> <span className='text-gray-500'>www.google.com</span></p> */}
                        <p>Address </p>
                        {/* <p className='flex items-center justify-between'><span className=''>Line 1 :</span> <span className='text-gray-500'>{getPartnerDetails?.data?.routing_number}</span></p> */}
                        <p className='flex items-center justify-between'><span className=''>City :</span> <span className='text-gray-500'>{getPartnerDetails?.data?.city}</span></p>
                        <p className='flex items-center justify-between'><span className=''>State :</span> <span className='text-gray-500'>{getPartnerDetails?.data?.state}</span></p>
                        <p className='flex items-center justify-between'><span className=''>Country :</span> <span className='text-gray-500'>{getPartnerDetails?.data?.country}</span></p>
                        <p className='flex items-center justify-between'><span className=''>Postal Code :</span> <span className='text-gray-500'>{getPartnerDetails?.data?.address_postal_code}</span></p>
                    </div>
                }
            </div>}
        </div>
    )
}

export default PartnerDetails