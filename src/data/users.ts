import type {GridColDef} from '@mui/x-data-grid'

export interface User {
  email: string
  id: number
  name: string
  phoneNumber: string
}

const gotNames = ['Jon Snow', 'Daenerys Targaryen', 'Tyrion Lannister', 'Arya Stark', 'Cersei Lannister', 'Sansa Stark', 'Jaime Lannister', 'Bran Stark', 'Jorah Mormont', 'Theon Greyjoy', 'Samwell Tarly', 'Lord Varys', 'Brienne of Tarth', 'Davos Seaworth', 'Melisandre', 'Bronn', 'Missandei', 'Eddard Stark', 'Catelyn Stark', 'Petyr Baelish']

export const generateRandomID = () => Math.floor(Math.random() * 10000)

const generateUser = (name: string): User => ({
  email: `${name.toLowerCase().replace(/ /g, '.')}@example.com`,
  id: generateRandomID(),
  name,
  phoneNumber: `+358${Math.floor(Math.random() * 9000000) + 1000000}`
})

export const users = (): User[] => {
  return gotNames.map(name => generateUser(name))
}
export const userHead: GridColDef[] = [
  {field: 'name', headerName: 'Full name', type: 'string', width: 200},
  {field: 'email', headerName: 'E-mail address', type: 'string', width: 200},
  {field: 'phoneNumber', headerName: 'Phone number', type: 'string', width: 200},
  {field: 'edit', headerName: '', type: 'action', width: 48},
  {field: 'delete', headerName: '', type: 'action', width: 48}
]
