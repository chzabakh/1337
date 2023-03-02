/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   imageiso.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/16 20:50:15 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/19 16:56:09 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	ft_form1(t_mlx *m)
{
	m->a = m->dist * m->x;
	m->b = m->dist * m->y;
	m->c = m->dist * (m->x + 1);
	m->d = m->dist * m->y;
}

void	ft_form2(t_mlx *m)
{
	m->a = m->dist * m->x;
	m->b = m->dist * m->y;
	m->c = m->dist * m->x;
	m->d = m->dist * (m->y + 1);
}

void	ft_move(t_mlx *m)
{
	m->a = m->a + m->arwj;
	m->b = m->b + m->arwi;
	m->c = m->c + m->arwj;
	m->d = m->d + m->arwi;
	ft_lineiso(*m);
}

void	ft_drawiso(t_mlx *m)
{
	m->y = 0;
	while (m->y < m->l)
	{
		m->x = 0;
		while (m->x < m->min)
		{
			if (m->x < m->min - 1)
			{
				ft_form1(m);
				iso(&m->a, &m->b, m->intable[m->y][m->x]);
				iso(&m->c, &m->d, m->intable[m->y][m->x + 1]);
				ft_move(m);
			}
			if (m->y < m->l - 1)
			{
				ft_form2(m);
				iso(&m->a, &m->b, m->intable[m->y][m->x]);
				iso(&m->c, &m->d, m->intable[m->y + 1][m->x]);
				ft_move(m);
			}
			m->x++;
		}
		m->y++;
	}
}

void	ft_imageiso(t_mlx m)
{
	m.arwi = 0;
	m.arwj = 0;
	m.x0 = 0;
	m.y0 = 0;
	ft_init(&m);
	ft_drawiso(&m);
	mlx_hook(m.win_ptr, 2, 0, keypressiso, (void *)&m);
	mlx_hook(m.win_ptr, 17, 0, close_window, (void *)&m);
	mlx_loop(m.mlx_ptr);
}
