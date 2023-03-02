/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   julia.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/27 17:04:45 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:28:02 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

void	ft_norm2(t_mlx *z, t_mlx *c, t_mlx *m)
{
	m->iter = 1;
	z->r = m->remin + m->x / 500.0 * (m->remax - m->remin);
	z->i = m->remin + m->y / 500.0 * (m->remax - m->remin);
	c->r = m->remin + m->mousex / (500.0 / (m->remax - m->remin));
	c->i = m->immin + m->mousey / (500.0 / (m->immax - m->immin));
}

void	ft_julia(t_mlx *m)
{
	t_mlx	z;
	t_mlx	c;
	t_mlx	tmp;

	m->y = 0;
	while (m->y < 500)
	{
		m->x = 0;
		while (m->x < 500)
		{
			ft_norm2(&z, &c, m);
			while (sqrt(z.r * z.r + z.i * z.i) < 2 && m->iter < m->maxiter)
			{
				tmp = z;
				z.r = tmp.r * tmp.r - tmp.i * tmp.i + c.r;
				z.i = 2.0 * tmp.r * tmp.i + c.i;
				m->iter++;
			}
			m->color = m->iter == 100 ? 0 : 0x0000FF * (m->iter * 20 + 1);
			m->i_s[(m->y * 500) + m->x] = m->color;
			m->x++;
		}
		m->y++;
	}
	mlx_put_image_to_window(m->mlx_ptr, m->win_ptr, m->img_ptr, 0, 0);
}
