import { DELETE_STRUCTURE, STRUCTURE_LIST } from "@/apollo/resolvers/productResolvers";
import Table from "@/components/general_components/Table/Table";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
//@ts-ignore
import dayjs, { dayjstr } from "util/dayjs";


export default function StructureTable(props: any) {
    const { data, loading, error } = useQuery(STRUCTURE_LIST)
    const [deleteStructure, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STRUCTURE)
    const deleteDataFromTable = (id: any) => {
        deleteStructure({
            variables: {
                input: { _id: id }
            }, refetchQueries: [STRUCTURE_LIST]
        })
    }
    function getNames() {
        if (props.data.length > 0) {
            const clearNames = Object.getOwnPropertyNames(props.data[0]).filter((n: any) => {
                if (n != "_id" && n != "__typename") {
                    return n
                }
            })
            clearNames.push("İşlem")
            return clearNames
        } else {
            return []
        }
    }
    if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>
    return (
        <>
            <Table data={data?.getAllStructures} deleteFunc={deleteDataFromTable} updateState={props.updateState} />
        </>
    );
}