import React, { useState } from 'react';
import { useTheme } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AlertDialog from '../AlertDialog';

export default function CustomMaterialTable({
  title,
  queryKey,
  service,
  columns,
  errorRef,
  disableDeleteAction 
}) {
  const theme = useTheme();
  const { isLoading, data, refetch } = useQuery(queryKey, () => service.findAll());
  
  const { mutateAsync: createRecord } = useMutation((payload) => service.create(payload), {
    onSuccess: onSuccessReset,
    onError: (e) => (errorRef.current = e),
  });

  const { mutateAsync: updateRecord } = useMutation((payload) => service.update(payload), {
    onSuccess: onSuccessReset,
    onError: (e) => (errorRef.current = e),
  });

  const { mutateAsync: deleteRecord } = useMutation((payload) => service.delete(payload), {
    onSuccess: onSuccessReset,
    onError: (e) => (errorRef.current = e),
  });

  const [selectedItemId, setSelectedItemId] = useState(null);

  function onSuccessReset() {
    refetch();
    resetErrors();
  }

  function resetErrors() {
    errorRef.current = null;
  }

  const handleDelete = (id) => {
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRecord(selectedItemId);
      setSelectedItemId(null);
      return true;
    } catch (error) {
      console.error("Error deleting record:", error);
      return false;
    }
  };

  const handleCloseDialog = () => {
    setSelectedItemId(null);
  };

  const actions = disableDeleteAction
    ? []
    : [
        {
          icon: DeleteIcon,
          tooltip: "Delete",
          onClick: (event, rowData) => handleDelete(rowData.id),
        },
      ];

  return (
    <>
      <MaterialTable
        style={{
          margin: "2em",
          backgroundColor: "#222", // Dark background
          color: "white", // Text color
        }}
        isLoading={isLoading}
        localization={{
          header: {
            actions: "",
          },
        }}
        title={
          <Typography
            variant={"h4"}
            style={{
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "0.5em",
              color: "#fff", // Title color
            }}
          >
            {title}
          </Typography>
        }
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          paginationType: "stepped",
          headerStyle: {
            backgroundColor: "#333", // Dark header
            color: "#fff",
            fontWeight: "bold",
          },
          rowStyle: {
            backgroundColor: "#222", // Dark rows
            color: "#ddd",
            borderBottom: "1px solid #444",
          },
          searchFieldStyle: {
            backgroundColor: "#444", // Dark search bar
            color: "#fff",
          },
          toolbar: {
            backgroundColor: "#222",
          },
        }}
        editable={{
          onRowAdd: createRecord,
          onRowUpdate: updateRecord,
          onRowUpdateCancelled: resetErrors,
          onRowAddCancelled: resetErrors,
        }}
        actions={actions}
      />
      <AlertDialog
        open={Boolean(selectedItemId)}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
