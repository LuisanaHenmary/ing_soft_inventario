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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableProducts = (props) => {

    const { products, openView, openDelete, openEdit } = props;

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
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" align="center">
                                    {obj.name}
                                </TableCell>
                                <TableCell align="center">{obj.price}</TableCell>
                                <TableCell align="center">{obj.acount}</TableCell>

                                <TableCell>
                                    <IconButton onClick={() => openView(index)}>
                                        <VisibilityIcon id={index} sx={{ color: "black" }} />
                                    </IconButton>
                                </TableCell>

                                <TableCell>
                                    <IconButton onClick={() => openDelete(obj.idDocument)}>
                                        <DeleteIcon id={index} sx={{ color: "black" }} />
                                    </IconButton>
                                </TableCell>

                                <TableCell>
                                    <IconButton onClick={() => openEdit(index)}>
                                        <EditIcon id={index} sx={{ color: "black" }} />
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
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default TableProducts