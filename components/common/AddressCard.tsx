import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { Edit } from "react-feather";
import { Address } from "../../interfaces";

interface Props {
  address: Address;
  orderId: string;
}

export const AddressCard: FC<Props> = ({ address, orderId }) => {
  const AddressModal = dynamic(
    () => import("./AddressModal"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div
        className="group bg-white text-black border rounded-xl  p-4 flex justify-between
     transition-all cursor-pointer hover:bg-shade active:scale-95 text-sm animate-opacityin"
        onClick={handleClick}
      >
        <div>
          <h2 className="font-semibold text-base mb-1">Dirección {orderId}</h2>
          <div>
            {address.state}, {address.city}
          </div>
          <div>{address.addressLine1}</div>
          <div>{address.addressLine2}</div>
          <div>{address.addressReference}</div>
        </div>
        <Edit className="group-hover:text-blue-400" />
      </div>
      <AddressModal
        show={showModal}
        handleClose={handleCloseModal}
        address={address}
      />
    </>
  );
};

export default AddressCard;
