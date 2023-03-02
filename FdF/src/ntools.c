/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ntools.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/19 16:14:38 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/19 19:45:01 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	iso(int *x, int *y, int z)
{
	int previous_x;
	int previous_y;

	previous_x = *x;
	previous_y = *y;
	*x = (previous_x - previous_y) * cos(0.523599);
	*y = -z + (previous_x + previous_y) * sin(0.523599);
}

int		close_window(void *m)
{
	if (m)
	{
		system("clear");
		exit(0);
	}
	return (0);
}

void	ft_menu(void)
{
	system("clear");
	ft_putendl("\033[3;33m \n\tMenu\n");
	ft_putendl("\033[0;33m \n\nArrow Up     :  Move map up");
	ft_putendl("\033[0;33m \n\nArrow Down   :  Move map down");
	ft_putendl("\033[0;33m \n\nArrow Left   :  Move map left");
	ft_putendl("\033[0;33m \n\nArrow Right  :  Move map right");
	ft_putendl("\033[0;33m \n\n      +      :  Zoom in");
	ft_putendl("\033[0;33m \n\n      -      :  Zoom out");
}
