/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tools.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/26 15:55:53 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:24:49 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

void	keypress2(int keycode, t_mlx *m2)
{
	if (keycode == 123)
		m2->arwj++;
	if (keycode == 124)
		m2->arwj--;
	if (keycode == 125)
		m2->arwi--;
	if (keycode == 126)
		m2->arwi++;
}

int		keypress(int keycode, void *m)
{
	t_mlx *m2;

	m2 = (t_mlx *)m;
	if (keycode == 53 && m)
	{
		system("clear");
		exit(0);
	}
	keypress2(keycode, m2);
	if (keycode == 69)
		m2->maxiter = m2->maxiter + 5;
	if (keycode == 78)
		m2->maxiter = m2->maxiter - 5;
	if (keycode == 67)
		m2->clr++;
	if (keycode == 75)
		m2->clr--;
	if (keycode == 116 && m2->clr2 * 2 < 2097152)
		m2->clr2 = m2->clr2 * 2;
	if (keycode == 121 && m2->clr2 / 2 > 5)
		m2->clr2 = m2->clr2 / 2;
	ft_clear_image(m2);
	ft_draw(m2);
	return (0);
}

int		mousepress(int button, int x, int y, t_mlx *m)
{
	x = 0;
	y = 0;
	if (button == 5 || button == 4)
	{
		zoom(m, button, m->mousex, m->mousey);
		ft_clear_image(m);
		ft_draw(m);
	}
	if (button == 1)
	{
		m->v = 1;
		ft_clear_image(m);
		ft_draw(m);
	}
	if (button == 2)
	{
		m->v = 2;
		ft_clear_image(m);
		ft_draw(m);
	}
	return (0);
}
