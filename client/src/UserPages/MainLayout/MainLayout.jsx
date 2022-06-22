import React from "react";

function MainLayout(props) {
  const { View, Menu } = props;
  return (
    <div className="main-layout-container">
      <View {...props} />
      <div className="bottom-bar">하단 바입니다</div>
    </div>
  );
}

export default MainLayout;
