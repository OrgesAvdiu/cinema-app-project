  import CustomMaterialTable from "../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { MultipleCheckboxTableCell, MultipleSelectTableCell, NumberFieldTableCell, TextFieldTableCell } from "../../component/TableCells";
import { QueryKeys } from "../../services/QueryKeys";
import { MovieService } from "../../services/MovieService";
import { CategoryService } from "../../services/CategoryService";
import { useQuery } from "react-query";
import { PriceFieldTableCell, SelectTableCell } from "../../component/TableCells";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const movieService = new MovieService();
const categoryService = new CategoryService();
export default function MovieView({}) {
  const errorRef = useRef();
  const {data: allCategories} = useQuery(QueryKeys.CATEGORIES, () => categoryService.findAll());
  
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
    title: "Duration",
    field: "duration",
    editComponent: (props) => NumberFieldTableCell(props, errorRef),
  },
 {
 title: 'Release Date', 
 type:"date",
 field: 'releaseDate',     
 editComponent: (props) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      value={props.value}
      onChange={(date) => props.onChange(date)}
      format="yyyy-MM-dd"
      inputVariant="outlined"
      fullWidth
    />
  </MuiPickersUtilsProvider>
),
 },
 {
  title: "Rating",
  field: "rating",
  editComponent: (props) => NumberFieldTableCell(props, errorRef),
},
 {
  title: "Language",
  field: "language",
  editComponent: (props) => TextFieldTableCell(props, errorRef),
},
{
  title: 'Image Url',
  field: 'imageUrl',
  editComponent: props => (
    <input
      type={"file"}
      onChange={event => props.onChange(event.target.files[0].name)}
    />
  )
},
    
    {
      title: "Price",
      field: "price",
      render: rowData => `${rowData.price}$`,
      editComponent: (props) => PriceFieldTableCell(props, errorRef), 
    },
   
    {
      title: 'Categories',
      field: 'category',
      render: (rowData) => {
        if (!rowData.category || rowData.category.length === 0) {
          return 'No categories'; // Show 'No categories' if empty
        }
        return rowData.category.map(cat => cat.name).join(', '); // Ensure categories names are joined
      },
      editComponent: props => MultipleCheckboxTableCell(props, allCategories, item => item.name)
    },    
  ];

  return (
    <CustomMaterialTable
      title="Manage Movies"
      columns={columns}
      service={movieService}
      queryKey={QueryKeys.MOVIE}
      errorRef={errorRef}
      // disableDeleteAction
    />
  );
}
