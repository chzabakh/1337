/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tools2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/02/13 17:08:25 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:23:33 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

int		close_window(void *m)
{
	if (m)
	{
		system("clear");
		exit(0);
	}
	return (0);
}

void	ft_clear_image(t_mlx *move2)
{
	int i;

	i = 0;
	while (i < (500 * 500))
	{
		move2->i_s[i] = 0x000000;
		i++;
	}
}

double	interpolate(double start, double end, double interpolation)
{
	return (start + ((end - start) * interpolation));
}

void	zoom(t_mlx *m, int button, int x, int y)
{
	double mousere;
	double mouseim;
	double interpolation;

	mousere = (double)x / (500 / (m->remax - m->remin)) + m->remin;
	mouseim = (double)y / (500 / (m->immax - m->immin)) + m->immin;
	if (button == 4)
		m->zm = 0.8;
	if (button == 5)
		m->zm = 1.3;
	interpolation = m->zm;
	m->remin = interpolate(mousere, m->remin, interpolation);
	m->immin = interpolate(mouseim, m->immin, interpolation);
	m->remax = interpolate(mousere, m->remax, interpolation);
	m->immax = interpolate(mouseim, m->immax, interpolation);
}

int		mousemove(int x, int y, t_mlx *m)
{
	if (m->v == 1)
	{
		m->mousex = x;
		m->mousey = y;
		ft_clear_image(m);
		ft_draw(m);
	}
	return (0);
}
