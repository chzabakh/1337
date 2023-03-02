/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fbrot.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/02/13 17:02:52 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/13 17:04:30 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

void		ft_norm5(t_mlx *z, t_mlx *tmp, t_mlx c, t_mlx *m)
{
	tmp->r = 0.0;
	tmp->i = 0.0;
	z->r = 0.0;
	z->i = 0.0;
	while (z->r * z->r + z->i * z->i < 4 && m->iter < 100)
	{
		z->r = tmp->r * tmp->r * tmp->r * tmp->r * tmp->r \
		+ 5 * tmp->r * tmp->i * tmp->i * tmp->i * tmp->i \
		- 10 * tmp->r * tmp->r * tmp->r * tmp->i * tmp->i + c.r;
		z->i = 5 * tmp->r * tmp->r * tmp->r * tmp->r * tmp->i \
		+ tmp->i * tmp->i * tmp->i * tmp->i * tmp->i \
		- 10 * tmp->r * tmp->r * tmp->i * tmp->i * tmp->i + c.i;
		tmp->r = z->r;
		tmp->i = z->i;
		m->iter++;
	}
}

void		ft_5brot(t_mlx *m)
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
			m->iter = 1;
			c.r = m->remin + (m->x + m->arwj) / (500.0 / (m->remax - m->remin));
			c.i = m->immin + (m->y + m->arwi) / (500.0 / (m->immax - m->immin));
			ft_norm5(&z, &tmp, c, m);
			m->color = m->iter == m->maxiter ? 0 : m->clr2 * m->iter * m->clr;
			m->i_s[(m->y * 500) + m->x] = m->color;
			m->x++;
		}
		m->y++;
	}
	mlx_put_image_to_window(m->mlx_ptr, m->win_ptr, m->img_ptr, 0, 0);
}
