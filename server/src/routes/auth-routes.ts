import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; //New

dotenv.config(); //New

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token

  //Substract user and password from request body

  const {username , password } = req.body;
  console.log('🔐 Login attempt:', { username });

  try {
    // Search user by username

    const user = await User.findOne({ where: {username}});

    if (!user) {
            // 🆕 DEBUG: No user found
            console.log('❌ User not found');
      return res.status (400).json({message: 'Invalid username or password'});
    }
    // 🆕 DEBUG: User was found
    console.log('✅ User found:', user.username);

    // Passwords comparison with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
            // 🆕 DEBUG: Password didn't match
            console.log('❌ Password mismatch');
      return res.status(400).json({message: 'Invalid username or password'})
    }
  

  // JWT Token generation 
  const token = jwt.sign({username: user.username}, process.env.JWT_SECRET || 'fallbackSecret', {
    expiresIn: '1h', // you can adjust time
  });

   // 🆕 DEBUG: Token generated
   console.log('🎫 Token generated');

  //Send token
  return res.json({ token});
} catch (error) {
  // 🆕 DEBUG: Catch any server error
  console.error('🚨 Server error during login:', error);
  return res.status(500).json({ message: 'Server error'});

}
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
