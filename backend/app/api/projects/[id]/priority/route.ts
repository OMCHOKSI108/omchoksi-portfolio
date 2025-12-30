import { NextRequest } from 'next/server';
import { updateProjectPriorityHandler } from '@/controllers/projectController';
import { success, error as errorRes } from '@/lib/response';

type RouteParams = {
    id: string;
};

type RouteContext = {
    params: Promise<RouteParams>;
};

export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    const { id } = await context.params;
    const { verifyToken } = await import('@/lib/auth');
    const result = await updateProjectPriorityHandler(request as NextRequest, id, verifyToken);
    if (result.success) return success(result.message, result.data);
    if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
    if (result.message === 'Project not found') return errorRes('Project not found', 404);
    return errorRes(result.message, 400);
}
