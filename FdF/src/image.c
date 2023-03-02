/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   image.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/12 20:01:15 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/16 21:41:41 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	ft_draw(t_mlx *m)
{
	int i;
	int j;

	m->x0 = 0;
	m->y0 = 0;
	m->x0 = m->x0 + m->arwj;
	m->y0 = m->y0 + m->arwi;
	i = 0;
	while (i < m->l)
	{
		j = 0;
		while (j < m->min)
		{
			if (j < m->min - 1)
				ft_line(*m, m->x0 + m->dist, m->y0, m->hextable[i][j]);
			if (i < m->l - 1)
				ft_line(*m, m->x0, m->y0 + m->dist, m->hextable[i][j]);
			m->x0 = m->x0 + m->dist;
			j++;
		}
		m->y0 = m->y0 + m->dist;
		m->x0 = 0 + m->arwj;
		i++;
	}
}

void	ft_image(t_mlx m)
{
	m.arwi = 0;
	m.arwj = 0;
	m.x0 = 0;
	m.y0 = 0;
	ft_init(&m);
	ft_draw(&m);
	mlx_hook(m.win_ptr, 2, 0, keypress, (void *)&m);
	mlx_hook(m.win_ptr, 17, 0, close_window, (void *)&m);
	mlx_loop(m.mlx_ptr);
}
