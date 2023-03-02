/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   image.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/16 17:24:51 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:37:30 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fractol.h"

void	ft_init(t_mlx *m)
{
	m->r = 0.0;
	m->i = 0.0;
	m->remax = 0.0;
	m->remin = 0.0;
	m->immax = 0.0;
	m->immin = 0.0;
	m->mousex = 0.0;
	m->mousey = 0.0;
	m->clr2 = 1;
	m->x = 0;
	m->y = 0;
	m->color = 0;
	m->zm = 1;
	m->v = 1;
	m->iter = 1;
	m->arwj = 0;
	m->arwi = 0;
	m->remax = 2;
	m->remin = -2;
}

void	ft_draw(t_mlx *m)
{
	if (m->index == 1)
		ft_mandelbrot(m);
	else if (m->index == 2)
		ft_julia(m);
	else if (m->index == 3)
		ft_tricorn(m);
	else if (m->index == 4)
		ft_multibrot(m);
	else if (m->index == 5)
		ft_5brot(m);
	else if (m->index == 6)
		ft_burningship(m);
}

void	ft_image(t_mlx *m)
{
	m->mlx_ptr = mlx_init();
	m->win_ptr = mlx_new_window(m->mlx_ptr, 500, 500, "Fractol");
	m->img_ptr = mlx_new_image(m->mlx_ptr, 500, 500);
	m->i_s = (int*)mlx_get_data_addr(m->img_ptr, &(m->bpp), &(m->l), &(m->ed));
	ft_init(m);
	m->immax = 2;
	m->immin = -2;
	m->maxiter = 100;
	m->clr = 20;
	ft_draw(m);
	mlx_hook(m->win_ptr, 2, 0, keypress, (void *)m);
	mlx_hook(m->win_ptr, 4, 0, mousepress, (void *)m);
	mlx_hook(m->win_ptr, 6, 0, mousemove, (void *)m);
	mlx_hook(m->win_ptr, 17, 0, close_window, (void *)m);
	mlx_loop(m->mlx_ptr);
}
