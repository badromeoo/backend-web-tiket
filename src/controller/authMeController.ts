import { Response } from 'express';
import { AuthenticatedRequest } from '../type/request/authRequest.ts';
import findUserByUserId from '../repository/findUserByUserId.ts';
import * as z from 'zod';
import errorMessageZod from '../type/errorMessageZod/errorMessageZod.ts';

const authMeController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await findUserByUserId(req.body.userId)
      .select('username email role createdAt updatedAt')
      .lean();
    if (!user) {
      return res.status(404).json({
        message: 'user tidak ditemukan',
      });
    }
    const resMePayload = {
      id: req.body.userId,
      username: user.username,
      email:user.email,
      role:user.role,
      createAt:user.createdAt,
      updatedAt:user.updatedAt
    };

    res.status(200).json({
      message: 'berhasil ke me',
      data:resMePayload
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        message: `${errorMessageZod(err)}`,
        status: 'fail',
      });
    } else {
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  }
};
export default authMeController;
