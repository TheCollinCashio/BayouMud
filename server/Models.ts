import { connect } from 'mongoose'
connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

import User from './models/User'

export { User }

