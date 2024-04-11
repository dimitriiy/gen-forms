import stylex from "@stylexjs/stylex";

export const classes = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    marginLeft: 10,
    padding: 15,
    borderRadius: 8,
    width: "30%",
    minWidth: 400,
  },

  body: { overflow: "auto", height: 0, flex: 1 },

  bodyScrollable: {
    display: "flex",
    flexDirection: "column",
  },
  actions: { display: "flex", justifyContent: "space-between", background: "#fff", paddingTop: 11 },
  rightSlotActions: {},
});
