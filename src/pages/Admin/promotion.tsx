import React, { useContext, useEffect, useState } from "react";
import { PromotionContext } from "../../context/promotionContextAdmin";
import Header from "../../Layout/Header";
import ListComponent from "../../common/List/list";
import { PROMOTION_ADMIN_COLUMNS } from "../../constants";
import { Promotion } from "../../types";
import Sidebar from "../../Layout/sideBar/SidebarPage";

const PromotionPage = () => {
  const promotionContext = useContext(PromotionContext);
  const [promotionData, setPromotionData] = useState<Promotion[]>([]);

  useEffect(() => {
    promotionContext?.getPromotionList();
    promotionContext?.refreshList();
  }, [promotionContext]);

  useEffect(() => {
    setPromotionData(promotionContext?.promotionList || []);
  }, [promotionContext?.promotionList]);


  return (
    <>
      <Sidebar />
      <Header />

      <div>
        <ListComponent
          title={"Liste des promotions"}
          columns={PROMOTION_ADMIN_COLUMNS}
          data={promotionData ? promotionData.reverse() : []}
          actions={true}
          remove={true}
          //deleteHandler={handleDelete}
          modify={false}
        />
      </div>
    </>
  );
};

export default PromotionPage;
