const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          MernBooking.com
        </span>
        <span className="text-white font-bold flex traking-tight gap-4 flex-col ">
          <p className="cursor-pointer">privicy Policy</p>
          <p className="cursor-pointer"> Term of Services</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
