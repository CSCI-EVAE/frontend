import { FC } from "react"
import { UeToDisplay } from "../types"
import ListComponent from "../common/List"
import { UE_LIST_COLUMNS } from "../constants"

interface DetailsProps {
    ue: UeToDisplay[]
}
const UeListComponent: FC<DetailsProps> = ({ ue }) => {
    return (
        <>
            <ListComponent
                title={""}
                columns={UE_LIST_COLUMNS}
                data={ue}
                actions={false}
                filter={true}
            />
        </>
    )
}
export default UeListComponent
