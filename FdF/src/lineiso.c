/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   line.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/14 17:07:42 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/19 17:18:21 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	first_caseiso(t_mlx m, t_bres b)
{
	while (m.b != m.d)
	{
		m.b += b.stpy;
		b.am += b.dx;
		if (b.am >= b.dy)
		{
			m.a += b.stpx;
			b.am -= b.dy;
		}
		mlx_pixel_put(m.mlx_ptr, m.win_ptr, m.a, m.b, m.hextable[m.y][m.x]);
	}
}

void	second_caseiso(t_mlx m, t_bres b)
{
	while (m.a != m.c)
	{
		m.a += b.stpx;
		b.am += b.dy;
		if (b.am >= b.dx)
		{
			m.b += b.stpy;
			b.am -= b.dx;
		}
		mlx_pixel_put(m.mlx_ptr, m.win_ptr, m.a, m.b, m.hextable[m.y][m.x]);
	}
}

void	ft_affect(t_bres *b, t_mlx *m)
{
	m->a = m->a + 500;
	m->b = m->b + 200;
	m->c = m->c + 500;
	m->d = m->d + 200;
	b->dx = m->c - m->a;
	b->dy = m->d - m->b;
	b->stpx = b->dx >= 0 ? 1 : -1;
	b->stpy = b->dy >= 0 ? 1 : -1;
	b->dx = b->dx >= 0 ? b->dx : b->dx * -1;
	b->dy = b->dy >= 0 ? b->dy : b->dy * -1;
	b->am = 0;
}

void	ft_lineiso(t_mlx m)
{
	t_bres	b;

	ft_affect(&b, &m);
	if (!m.hextable[m.y][m.x])
		m.hextable[m.y][m.x] = 0xffffff;
	mlx_pixel_put(m.mlx_ptr, m.win_ptr, m.a, m.b, m.hextable[m.y][m.x]);
	if (b.dy > b.dx)
		first_caseiso(m, b);
	if (b.dx >= b.dy)
		second_caseiso(m, b);
}
