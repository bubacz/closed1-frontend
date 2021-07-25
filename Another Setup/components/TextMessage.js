// import Avatar from "./ui/Avatar";

export default ({ direction, text, author, test, me }) => (
  <div
    style={{
      transform: "scaleX(-1)"
    }}
  >
    <div className="flex justify-end my-4">
      <div className="flex items-end justify-end md:w-3/5 lg:2/5">
        <div className="mr-3">
          <div
            className="text-xs text-grey mb-1 mx-3"
            style={{
              transform: "scaleX(-1)"
            }}
          >
            {direction === "incoming" ? author : "You"}
          </div>
          <div
            className={[
              "p-3 py-2 leading-normal text-bg",
              "bg-grey-lighter"
            ].join(" ")}
            style={{
              borderRadius: 10,
              transform:"scaleX(-1)"
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  </div>
);
