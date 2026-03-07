import React, { useState } from "react";
import PageName from "../../Components/Shared/PageName";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { RxStarFilled } from "react-icons/rx";
import MapComponent from "../../Components/MapComponent";
import { useParams } from "react-router-dom";
import { useGetAuctionManagementDetailsQuery } from "../../redux/api/auctionManagementApi";
import { imageUrl } from "../../redux/api/baseApi";
import { Image } from "antd";
import Loading from '../../Components/Loading/Loading';


const AuctionDetails = () => {
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

  const { id } = useParams();
  const { data: getAuctionDetails, isLoading } = useGetAuctionManagementDetailsQuery(id);

  console.log(getAuctionDetails?.data?.result?.confirmedPartner);

  const [swiperRef, setSwiperRef] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false);
  const handleLoad = () => {
    setGoogleApiLoaded(true);
  };

  return (
    <div className="bg-white rounded-md p-5">
      <PageName name={"Auction Details"} />

      {isLoading ? <Loading type="detail" /> : <div className="max-w-4xl mx-auto mt-10">
        <div>
          <p>Items Image</p>
          <div className="flex items-center  justify-between mt-5 gap-5 ">
            <Image.PreviewGroup>
              {getAuctionDetails?.data?.result?.image?.map((img, i) => (
                <Image
                  key={i}
                  src={`${imageUrl}${img}`}
                  alt={`preview-${i}`}
                  width={250}
                  height={144}
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                  preview={{ mask: "Click to preview" }}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
        <div className="mt-5 space-y-2">
          {/* <div className='flex items-center justify-between'>
                        <p >Route & Status</p>
                        <p className='text-[#007BFF] font-semibold cursor-pointer' onClick={() => setOpenMapModal(true)}>View Route Map</p>
                    </div> */}
          <div className="flex items-center justify-between">
            <p className="font-medium">User Name : </p>
            <p>{getAuctionDetails?.data?.result?.confirmedPartner?.name}</p>
          </div>
          <p className="flex items-center justify-between ">
            <span className="font-medium">Date : </span>{" "}
            <span>
              {getAuctionDetails?.data?.result?.createdAt?.split("T")[0]}
            </span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Category : </span>{" "}
            <span>
              {getAuctionDetails?.data?.result?.category[0]?.category}
            </span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Amount : </span>{" "}
            <span>{getAuctionDetails?.data?.result?.price}</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Measurement: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.weightMTS} mts</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Weight: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.weightKG} kg</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Loading Floor: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.loadFloorNo} Floor</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Unloading Floor: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.unloadFloorNo} Floor</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Loading Address: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.loadingAddress}</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Unloading Address: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.unloadingAddress}</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">Distance: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.distance} km</span>{" "}
          </p>
          <p className="flex  justify-between gap-5">
            <span className="font-medium">Description: </span>{" "}
            <span>{getAuctionDetails?.data?.result?.description}</span>{" "}
          </p>
          <p className="flex  justify-between gap-5">
            <span className="font-medium"> Auction Deadline</span>{" "}
            <span>
              {getAuctionDetails?.data?.result?.deadlineDate?.split("T")[0]} at{" "}
              {getAuctionDetails?.data?.result?.deadlineTime}
            </span>{" "}
          </p>
          <p className="flex  justify-between gap-5">
            <span className="font-medium">Service Date</span>{" "}
            <span>
              {getAuctionDetails?.data?.result?.scheduleDate?.split("T")[0]} at{" "}
              {getAuctionDetails?.data?.result?.scheduleTime}
            </span>{" "}
          </p>
          {/* <p className='flex  justify-between gap-5'><span className='font-medium'>Minimum Price</span> <span>$25</span> </p>
                    <p className='flex  justify-between gap-5'><span className='font-medium'>Maximum Price</span> <span>$65</span> </p> */}
          <p className="flex  justify-between gap-5">
            <span className="font-medium">Status</span>{" "}
            <span>{getAuctionDetails?.data?.result?.status}</span>{" "}
          </p>
        </div>

        {/* Winner section */}
        <p className=" mt-10 text-xl font-semibold">Winning Partner</p>
        {getAuctionDetails?.data?.result?.confirmedPartner ? (
          <div className="flex flex-col items-center bg-[#F2F2F2] rounded-md h-full justify-center mt-10 p-5">
            <div className=" h-20 w-20 mx-auto ">
              <img
                className="rounded-md"
                src={`${imageUrl}${getAuctionDetails?.data?.result?.confirmedPartner?.profile_image}`}
                alt=""
              />
            </div>
            <p className="font-medium py-2">
              {getAuctionDetails?.data?.result?.confirmedPartner?.name}
            </p>

            <p className="flex items-center py-2">
              <span>Rating : </span>{" "}
              <RxStarFilled className="text-orange-300 mx-2" />{" "}
              <span className="font-medium">
                {getAuctionDetails?.data?.result?.confirmedPartner?.rating}/5.0
              </span>
            </p>

            <div className="flex gap-10">
              <p>
                <span>Email : </span>
                {getAuctionDetails?.data?.result?.confirmedPartner?.email}
              </p>

              <p>
                Phone Number :{" "}
                {
                  getAuctionDetails?.data?.result?.confirmedPartner
                    ?.phone_number
                }
              </p>
            </div>
            <div className="flex gap-20 mt-5">
              <div>
                <p>license Plate Image : </p>
                <Image
                width={250}
                height={144}
                  src={`${imageUrl}${getAuctionDetails?.data?.result?.confirmedPartner?.licensePlateImage}`}
                  className="h-40 w-40 rounded-md"
                  alt=""
                />
              </div>
              <div>
                <p>vehicle Insurance Image: </p>
                <Image
                width={250}
                height={144}
                  src={`${imageUrl}${getAuctionDetails?.data?.result?.confirmedPartner?.vehicleInsuranceImage}`}
                  className="h-40 w-40 rounded-md"
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Partner Not selected yet!</p>
        )}

        <div className="mt-20">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {getAuctionDetails?.data?.result?.bids?.map((user, i) => {
              return (
                <SwiperSlide>
                  <div
                    key={i + 1}
                    className="flex flex-col items-center bg-[#F2F2F2] rounded-md h-full justify-center"
                  >
                    <div className=" h-20 w-20 mx-auto ">
                      <img
                        className="h-5 w-5 rounded-full"
                        src={`${imageUrl}${user?.partner?.profile_image}`}
                        alt=""
                      />
                    </div>
                    <p className="font-medium py-2">{user?.partner?.name}</p>

                    <p className="flex items-center py-2">
                      <span>Rating : </span>{" "}
                      <RxStarFilled className="text-orange-300 mx-2" />{" "}
                      <span className="font-medium">
                        {user?.partner?.rating}/5.0
                      </span>
                    </p>
                    <p>
                      <span>Bid : </span>{" "}
                      <span className="font-medium text-blue-500">
                        ${user?.price?.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>}
      <div>{/* <MapComponent/> */}</div>

      <MapComponent
        getAuctionDetails={getAuctionDetails}
        googleApiLoaded={googleApiLoaded}
      />
    </div>
  );
};

export default AuctionDetails;
