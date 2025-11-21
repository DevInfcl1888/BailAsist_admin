const NoData = ({ message = "No Data Found" }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontSize: "25px",
        color: "rgb(255, 69, 69)",
      }}
    >
      {message}
    </div>
  );
};

export default NoData;
