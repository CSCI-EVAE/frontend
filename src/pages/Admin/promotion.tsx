import React, { useContext} from "react";
import { PromotionAdminContext } from "../../context/promotionContextAdmin";
import Header from "../../Layout/Header";
import ListComponent from "../../common/List/list";
import { PROMOTION_ADMIN_COLUMNS } from "../../constants";
import Sidebar from "../../Layout/sideBar/SidebarPage";

const PromotionPage: React.FC = () => {


  const promotionContext = useContext(PromotionAdminContext)
 
  if (!promotionContext) {
      return <div>Loading...</div>
  }

  const { promotionList } = promotionContext

  console.log("je suis liste", promotionList)
  return (
    <>
      <Sidebar />
      <Header />

      <div>
        <ListComponent
          title={"Liste des promotions"}
          columns={PROMOTION_ADMIN_COLUMNS}
          data={promotionList}
          actions={false}
          
        />
      </div>
    </>
  );
};

export default PromotionPage;
