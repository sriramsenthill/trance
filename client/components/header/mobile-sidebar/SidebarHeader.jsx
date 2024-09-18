import Link from "next/link";

const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link href="/">
        <h1 style={{ fontFamily: "Arima", color: "black" }}>Trance</h1>
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
