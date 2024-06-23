import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    TablePagination,
    IconButton
} from "@mui/material"
import { useState } from "react"
import useStoreGlobal from "../../store/useStoreGlobal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const TableMovements = (props) => {

    const listMovements = useStoreGlobal((state) => state.listMovements);
    const { deleteFunction } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">fecha</TableCell>
                            <TableCell align="center">Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listMovements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{obj.type_mov}</TableCell>
                                <TableCell align="center">{obj.date}</TableCell>
                                <TableCell align="center">{obj.time}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <VisibilityIcon id={index} sx={{ color: "black" }} />
                                    </IconButton>
                                </TableCell>

                                <TableCell>
                                    <IconButton onClick={()=>deleteFunction(obj.idDocument)}>
                                        <DeleteIcon id={index} sx={{ color: "black" }} />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listMovements.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default TableMovements