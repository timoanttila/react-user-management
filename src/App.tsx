import {useState} from 'react'
import {DataGrid, type GridColDef, GridRowId} from '@mui/x-data-grid'
import {Alert, Box, Button, Grid, Modal, Snackbar, TextField, Typography} from '@mui/material'
import ApiIcon from '@mui/icons-material/Api'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {generateRandomID, users, type User} from './data/users'
import './App.css'

const userDefault: User = {id: 0, name: '', email: '', phoneNumber: ''}

const inputStyle = {
  backgroundColor: '#fafafa',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: '#909090',
      borderColor: '#f0f0f0'
    }
  }
}

const buttonStyle = {
  backgroundColor: '#ededed',
  borderColor: 'transparent',
  color: '#787878',
  fontWeight: '700',
  height: '40px',
  textTransform: 'none'
}

interface Message {
  type: 'success' | 'error'
  value: string
}

const fieldError: Message = {type: 'error', value: 'Please fill in all fields'}
const emailError: Message = {type: 'error', value: 'Please enter a valid email address'}

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState<number>(0)
  const [message, setMessage] = useState<Message | null>(null)
  const [newUser, setNewUser] = useState<User>(userDefault)
  const [userRows, setUserRows] = useState<User[] | []>(users())

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof User) => {
    setNewUser({...newUser, [field]: e.target.value})
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phoneNumber) {
      setMessage(fieldError)
      return
    }

    if (!validateEmail(newUser.email)) {
      setMessage(emailError)
      return
    }

    const userToAdd = {...newUser, id: generateRandomID()}
    setUserRows([...userRows, userToAdd])
    setNewUser(userDefault)
    setMessage({type: 'success', value: 'New user created'})
  }

  const handleEdit = (id: GridRowId) => {
    const user = userRows.find(u => u.id === id)
    if (user) {
      setEditingUser({...user})
      setModalOpen(Number(id))
    }
  }

  const handleSaveEdit = () => {
    if (!editingUser?.name || !editingUser?.email || !editingUser?.phoneNumber) {
      setMessage(fieldError)
      return
    }

    if (!validateEmail(editingUser.email)) {
      setMessage(emailError)
      return
    }

    setUserRows(userRows.map(user => (user.id === editingUser.id ? editingUser : user)))
    setModalOpen(0)
    setMessage({type: 'success', value: 'User updated'})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof User) => {
    if (editingUser) {
      setEditingUser({...editingUser, [field]: e.target.value})
    }
  }

  const handleDelete = (id: GridRowId) => {
    setUserRows(userRows.filter(user => user.id !== id) ?? [])
    setMessage({type: 'success', value: 'User deleted'})
  }

  const userHead: GridColDef[] = [
    {field: 'name', headerName: 'Full name', type: 'string', width: 250},
    {field: 'email', headerName: 'E-mail address', type: 'string', width: 250},
    {field: 'phoneNumber', headerName: 'Phone number', type: 'string', width: 250},
    {
      field: 'edit',
      headerName: '',
      type: 'action',
      width: 64,
      renderCell: params => (
        <Button onClick={() => handleEdit(params.id)} size="small">
          <EditIcon />
        </Button>
      )
    },
    {
      field: 'delete',
      headerName: '',
      type: 'action',
      width: 64,
      renderCell: params => (
        <Button onClick={() => handleDelete(params.id)} size="small">
          <DeleteIcon />
        </Button>
      )
    }
  ]

  return (
    <>
      <Grid container bgcolor="#ACB5BD" color="white" component="header" padding="32px">
        <Grid item display="flex" alignItems="center">
          <Box display="inline-block" marginRight="10px">
            <ApiIcon sx={{height: '32px', width: '32px'}} />
          </Box>

          <Typography component="span" display="inline-block" fontSize="1.8rem" fontWeight="bold">
            Software
          </Typography>
        </Grid>
      </Grid>

      <Grid container maxWidth="912px" margin="3rem auto" width="90vw">
        <Grid item component="header" marginBottom="3rem">
          <Typography component="h1" sx={{color: '#757575', fontWeight: 700, fontSize: '2.4rem', lineHeight: '1.2', margin: 0}}>
            List of participants
          </Typography>
        </Grid>

        <Grid item xs={12} bgcolor="white" padding="16px" component="form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Full name (5-50)" size="small" sx={inputStyle} variant="outlined" value={newUser.name} onChange={e => handleNewUserChange(e, 'name')} required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="E-mail address (6-100)" size="small" sx={inputStyle} type="email" variant="outlined" value={newUser.email} onChange={e => handleNewUserChange(e, 'email')} required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Phone number (5-15)" size="small" sx={inputStyle} variant="outlined" value={newUser.phoneNumber} onChange={e => handleNewUserChange(e, 'phoneNumber')} required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button sx={buttonStyle} variant="outlined" onClick={handleAddUser} disabled={newUser?.name?.length < 5 || newUser?.email?.length < 6 || newUser?.phoneNumber?.length < 5}>
                Add new
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} bgcolor="white" marginTop="0.6rem">
          <DataGrid
            rows={userRows}
            columns={userHead}
            sortModel={[
              {
                field: 'name',
                sort: 'asc'
              }
            ]}
            rowHeight={72}
            columnHeaderHeight={48}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeader': {
                color: '#757575',
                fontSize: '14px',
                fontWeight: '500 !important',
                lineHeight: '16px !important',
                padding: '0 24px'
              },
              '& .MuiDataGrid-row': {
                maxHeight: '72px !important'
              },
              '& .MuiDataGrid-cell': {
                color: '#505050',
                lineHeight: '24px',
                padding: '24px'
              },
              '& .MuiDataGrid-cellContent': {
                display: 'flex',
                alignItems: 'center'
              },
              '& .MuiDataGrid-cell--withRenderer': {
                padding: '0'
              },
              '& .MuiButtonBase-root': {
                color: '#909090',
                height: '24px',
                margin: '0 auto',
                minWidth: '24px',
                padding: '0',
                width: '24px'
              }
            }}
          />
        </Grid>
      </Grid>

      <Modal open={modalOpen > 0} onClose={() => setModalOpen(0)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            left: '50%',
            p: 4,
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '90vw'
          }}
        >
          <Typography id="modal-modal-title" component="h2" sx={{fontWeight: 700, fontSize: '2rem', margin: '0 0 2rem'}}>
            Edit User
          </Typography>

          <Grid container spacing={2} component="form">
            <Grid item xs={12}>
              <TextField fullWidth label="Full name" size="small" sx={inputStyle} variant="outlined" value={editingUser?.name || ''} onChange={e => handleChange(e, 'name')} required />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="E-mail address" size="small" sx={inputStyle} variant="outlined" value={editingUser?.email || ''} onChange={e => handleChange(e, 'email')} required />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Phone number" size="small" sx={inputStyle} variant="outlined" value={editingUser?.phoneNumber || ''} onChange={e => handleChange(e, 'phoneNumber')} required />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button sx={buttonStyle} variant="outlined" onClick={() => setModalOpen(0)}>
                Close
              </Button>

              <Button sx={{...buttonStyle, backgroundColor: '#0177ff', color: 'white', '&:hover': {backgroundColor: 'white', color: '#787878'}, '&:disabled': {backgroundColor: '#666', color: '#bbb'}}} variant="outlined" onClick={handleSaveEdit} disabled={!editingUser || editingUser.name?.length < 5 || editingUser.email?.length < 6 || editingUser.phoneNumber?.length < 5}>
                Save Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage(null)}>
        <Alert onClose={() => setMessage(null)} severity={message?.type} variant="filled">
          {message?.value}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
