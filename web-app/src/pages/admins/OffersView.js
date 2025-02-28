import CustomMaterialTable from "../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { MultipleCheckboxTableCell, NumberFieldTableCell, PriceFieldTableCell,  TextFieldTableCell } from "../../component/TableCells";
import { QueryKeys } from "../../services/QueryKeys";
import { OffersService } from "../../services/OffersService";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const offerService = new OffersService();
const initialStartTime = new Date(); 
const initialEndTime = new Date();
export default function OffersView({}) {
    const errorRef = useRef();

    const columns = [
        {
          title: "Title",
          field: "title",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "Description",
          field: "description",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
            title: "Discount",
            field: "discount",
            render: rowData => `${rowData.price}$`,
            editComponent: (props) => PriceFieldTableCell(props, errorRef), 
          },
          {
            title: 'Start Date Time',
            type:"data",
            field: 'startDate',
            initialEditValue: initialStartTime, editComponent: props => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                          {...props}
                          inputVariant="outlined"
                          format="yyyy-MM-dd HH:mm:ss" 
                          showTodayButton
                          autoOk
                          error={Boolean(props.helperText)}
                      />
                  </MuiPickersUtilsProvider>
          )
          },
          {
            title: 'End Date Time',
            type:"date",
            field: 'endDate',
            initialEditValue: initialEndTime,editComponent: props => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                  {...props}
                  inputVariant="outlined"
                  format="yyyy-MM-dd HH:mm:ss" 
                  showTodayButton
                  autoOk
                  error={Boolean(props.helperText)}
              />
          </MuiPickersUtilsProvider>
          )
          },
      ];

      return (
        <CustomMaterialTable
          title="Manage Offers"
          columns={columns}
          service={offerService}
          queryKey={QueryKeys.OFFER}
          errorRef={errorRef}
        />
      );
  }