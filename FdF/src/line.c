/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   line.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/14 17:07:42 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/20 00:36:18 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	first_case(t_bres b, t_mlx m, int y1, int color)
{
	while (m.y0 != y1)
	{
		m.y0 += b.stpy;
		b.am += b.dx;
		if (b.am >= b.dy)
		{
			m.x0 += b.stpx;
			b.am -= b.dy;
		}
		mlx_pixel_put(m.mlx_ptr, m.win_ptr, 100 + m.x0, 200 + m.y0, color);
	}
}

void	second_case(t_bres b, t_mlx m, int x1, int color)
{
	while (m.x0 != x1)
	{
		m.x0 += b.stpx;
		b.am += b.dy;
		if (b.am >= b.dx)
		{
			m.y0 += b.stpy;
			b.am -= b.dx;
		}
		mlx_pixel_put(m.mlx_ptr, m.win_ptr, 100 + m.x0, 200 + m.y0, color);
	}
}

void	ft_line(t_mlx m, int x1, int y1, int color)
{
	t_bres b;

	b.am = 0;
	b.dx = x1 - m.x0;
	b.dy = y1 - m.y0;
	b.stpx = b.dx >= 0 ? 1 : -1;
	b.stpy = b.dy >= 0 ? 1 : -1;
	b.dx = b.dx >= 0 ? b.dx : b.dx * -1;
	b.dy = b.dy >= 0 ? b.dy : b.dy * -1;
	if (color == 0)
		color = 0xffffff;
	mlx_pixel_put(m.mlx_ptr, m.win_ptr, 100 + m.x0, 200 + m.y0, color);
	if (b.dy > b.dx)
		first_case(b, m, y1, color);
	if (b.dx >= b.dy)
		second_case(b, m, x1, color);
}
